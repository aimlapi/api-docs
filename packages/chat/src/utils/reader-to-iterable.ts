export async function* readerToIterable<T, V>(
  reader: ReadableStreamDefaultReader<T>,
  transform: (value: T) => V[]
) {
  {
    let pump: ReadableStreamReadResult<T>;
    do {
      pump = await reader.read();
      if (pump.value !== undefined) {
        const values = transform(pump.value);
        for (const value of values) {
          yield value;
        }
      }
    } while (!pump.done);
  }
}
