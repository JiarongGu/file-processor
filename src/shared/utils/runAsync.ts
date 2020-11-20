export function runAsync<T = any>(func: () => T): Promise<T> {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        resolve(func());
      } catch (err) {
        reject(err);
      }
    })
  );
}
