Satisfactory Dedicated Server Query Port Probe
==============================================

A zero dependency Node.js library for probing the query port of a [Satisfactory Dedicated Server](https://satisfactory.fandom.com/wiki/Dedicated_servers).

Installation
------------

```
npm i @djwoodz/satisfactory-dedicated-server-query-port-probe
```

Example Usage
-------------

```js
// import module
const { probe } = require('@djwoodz/satisfactory-dedicated-server-query-port-probe');
```

```js
// probe using await
const data = await probe('127.0.0.1', 15777, 10000);
console.log(data);
```

```js
// probe using .then()
probe('127.0.0.1', 15777, 10000)
  .then((data) => {
    console.log(data);
  });
```

Example Response
----------------

```js
{
  id: 1, // the message id
  protocolVersion: 0, // the protocol version
  clientData: 1681304201371n, // the unique data sent to the server (timestamp)
  serverState: 'Game ongoing', // the state of the server
  serverVersion: 211839, // the version of the server
  queryPort: 15777 // the query port of the server
}
```

API
---

## probe([address], [port], [timeout]) ⇒ <code>Promise</code>

Requests data from a Satisfactory Dedicated Server's Query Port

**Returns**: <code>Promise</code> - Promise object that represents Query Port data

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [address] | <code>string</code> | <code>&#x27;127.0.0.1&#x27;</code> | The address of the Satisfactory Dedicated Server (hostname or IP) |
| [port] | <code>number</code> \| <code>string</code> | <code>15777</code> | The Query Port number of the Satisfactory Dedicated Server |
| [timeout] | <code>number</code> \| <code>string</code> | <code>10000</code> | The timeout for the request (milliseconds) |