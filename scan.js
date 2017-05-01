var noble = require('noble');

let activeScanning = false;

const activeStateString = 'poweredOn';

console.log('setup noble');

noble.on('stateChange', (state) => {
  if (state == activeStateString) {
    console.log('state is', activeStateString);
    noble.startScanning([], false, (err) => {
      if (err) {
        console.log(err.what());
        throw err;
      }
    }); //  any service UUID, no duplicates
  } else {
    console.log('state is not', activeStateString);
    console.log('state is', state);
  }
});

noble.on('discover', (peripheral) => {
  console.log('1. noble device found');
  console.log('1. device id', peripheral.id, 'addr', peripheral.addr);
  console.log('1. observed rssi', peripheral.rssi, 'from advert', peripheral.advertisement.localName, peripheral.advertisement.txPowerLevel);
  peripheral.once('rssiUpdate', (err, rssi) => {
    console.log('2. device id', peripheral.id, 'addr', peripheral.addr);
    console.log('2. observed rssi', rssi, 'from advert', peripheral.advertisement.localName, peripheral.advertisement.txPowerLevel);
  });
  peripheral.once('connect', (arg) => {
    console.log('peripheral connected', arg);
  });
  peripheral.once('disconnect', (arg) => {
    console.log('peripheral disconnected', arg);
  });
});

noble.on('warning', (message) => {
  console.log('noble warning', message);
});

noble.on('error', (err) => {
  console.log('noble error', err);
  noble.stopScanning();
  throw err;
});
