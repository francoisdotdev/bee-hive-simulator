const server = Bun.serve({
    port: 3000,
    routes : {
        "/": () => new Response('Bee Hive Simulator !'),
    }
});

console.log(`The Hive is running on :${server.url}`);