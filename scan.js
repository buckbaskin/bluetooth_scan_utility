var noble = require('noble');

let activeScanning = false;

const activeStateString = 'poweredO';

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

    noble.stopScanning();
  } else {
    console.log('state is not', activeStateString);
    console.log('state is', state);
  }
});

noble.on('warning', (message) => {
  console.log('noble warning', message);
});