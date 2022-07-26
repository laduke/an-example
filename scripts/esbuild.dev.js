const define = {
  global: "window",
};

console.log("starting esbuild watch");

require("esbuild")
  .build({
    entryPoints: ["./frontend/index.jsx"],
    bundle: true,
    sourcemap: "inline",
    outfile: "public/dist/bundle.js",
    target: ["chrome87", "firefox89", "safari13", "edge91"],
    plugins: [],
    watch: {
      onRebuild(error) {
        if (error) {
          console.error("watch build failed:", error);
        } else {
          console.log("watch build succeeded");
        }
      },
    },
    define,
  })
  .then((result) => {
    console.log("watching for future changes. ctrl-c to quit");

    process.on("SIGTERM", function () {
      console.log("Caught interrupt signal");

      result.stop();
      process.exit();
    });
  })
  .catch(() => process.exit(1));
