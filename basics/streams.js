// Streams and Buffer
// There are couple of streams. we will use read and write streams

const { clear } = require('console');
const fs = require('fs'); // Creating a File


const readStream = fs.createReadStream('../docs/largefile.txt', { encoding: 'utf-8'}); // Read Stream
const writeStream = fs.createWriteStream('../docs/largefile2.txt'); // Write Stream

// .on is an Event Listener on readStream (It actually listening to the data event)
// readStream.on('data', (chunk) => {
//     clear();
//     console.log('------New Chunk of Data-------');
//     console.log(chunk.toString()); // For make the data in readable format (Process 1)
//     console.log(chunk); // For make the data in readable format (Process 2) --> by declaring the second parameter of readStream object({ encoding: 'utf-8'})
//     writeStream.write('\nNew Chunk\n');
//     writeStream.write(chunk);
// });

readStream.pipe(writeStream);


