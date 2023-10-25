const udp = require('node:dgram');

const gameState = ['Unknown', 'No game loaded', 'Creating game', 'Game ongoing'];

/**
 * Requests data from a Satisfactory Dedicated Server's Query Port
 * @param {string} [address='127.0.0.1'] The address of the Satisfactory Dedicated Server (hostname
 * or IP)
 * @param {(number|string)} [port=15777] The Query Port number of the Satisfactory Dedicated Server
 * @param {(number|string)} [timeout=10000] The timeout for the request (milliseconds)
 * @returns {Promise} Promise object that represents Query Port data
 */
const probe = (address = '127.0.0.1', port = 15777, timeout = 10000) => new Promise((resolve, reject) => {
  const socket = udp.createSocket('udp4');
  const now = BigInt(new Date().getTime());

  const id = setTimeout(() => {
    clearTimeout(id);
    socket.close();
    reject(new Error('Connection timed out'));
  }, parseInt(timeout, 10));

  socket.on('message', (msg) => {
    const buf = Buffer.from(msg);

    const data = {
      id: buf.readUInt8(0),
      protocolVersion: buf.readUInt8(1),
      clientData: BigInt(buf.readBigUInt64LE(2)),
      serverState: gameState[buf.readUInt8(10)],
      serverVersion: buf.readUInt32LE(11),
      queryPort: buf.readUInt16LE(15),
    };

    if (data.clientData === now) {
      clearTimeout(id);
      socket.close();
      resolve(data);
    }
  });

  socket.on('error', (error) => {
    clearTimeout(id);
    socket.close();
    reject(error);
  });

  const buf = Buffer.alloc(10);
  buf.writeInt8(0, 0);
  buf.writeInt8(0, 1);
  buf.writeBigUInt64LE(now, 2);

  socket.send(
    buf,
    parseInt(port, 10),
    address,
    (error) => {
      if (error) {
        clearTimeout(id);
        socket.close();
        reject(error);
      }
    },
  );
});

module.exports = {
  probe,
};
