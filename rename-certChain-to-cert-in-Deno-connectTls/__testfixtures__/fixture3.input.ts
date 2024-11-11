const tlsConfig = {
    secureContext: {
      
        certChain: Deno.readTextFileSync("./server.crt")
      ,
      key: "path/to/key.pem"
    }
  };

  

  function startServer(config: { certChainChain: string; key: string }) {
    // server logic
  }
  
  startServer({
    
        certChain: Deno.readTextFileSync("./server.crt")
      ,
    key: "path/to/key.pem"
  });

  
  initializeConnection({
    host: "localhost",
    
        certChain: Deno.readTextFileSync("./server.crt")
      ,
    key: "path/to/key.pem"
  });

  const configs = [
    { 
        certChain: Deno.readTextFileSync("./server.crt")
      , key: "path/to/key1.pem" },
    { 
        certChain: Deno.readTextFileSync("./server.crt")
      , key: "path/to/key2.pem" }
  ];
  