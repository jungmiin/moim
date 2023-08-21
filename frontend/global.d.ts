export declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    connect: Mongoose | null;
  };
}
