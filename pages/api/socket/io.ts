import { Server as Server } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseSocketIO } from "@/types";

export const config = {
	api: {
		bodyParser: false,
	},
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseSocketIO) => {
	if (!res.socket.server.io) {
		const path = "/api/socket/io";
        const httpServer: Server = res.socket.server as any;
		const io = new ServerIO(httpServer, {
			path: path,
			addTrailingSlash: false,
		});
		res.socket.server.io = io;
	}
};

export default ioHandler;
