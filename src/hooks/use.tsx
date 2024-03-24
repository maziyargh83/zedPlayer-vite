/* eslint-disable @typescript-eslint/no-explicit-any */
export function use(promise: Promise<any> | any) {
  if (promise.status === "fulfilled") {
    return promise.value;
  }
  if (promise.status === "rejected") {
    throw promise.reason;
  } else if (promise.status === "pending") {
    throw promise;
  } else {
    promise.status = "pending";
    (promise as Promise<any>).then(
      (result: any) => {
        promise.status = "fulfilled";
        promise.value = result;
      },
      (reason: any) => {
        promise.status = "rejected";
        promise.reason = reason;
      }
    );
    throw promise;
  }
}
