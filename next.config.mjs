export default {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.0.184/orchestrator/:path*",
      },
    ];
  },
};
