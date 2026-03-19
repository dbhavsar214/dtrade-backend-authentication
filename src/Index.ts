import app, {startServer }from "./Server";


const port = Number(process.env.APPLICATION_PORT);

const init = async () =>{ 

    await startServer();
    app.listen(port, ()=>{
        console.log(`Authentication application running on port : ${port}`);
    })
}

init();

