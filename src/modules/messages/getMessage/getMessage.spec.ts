import {mockRequest, mockResponse} from "jest-mock-req-res";
import {getMessagesRoute} from "./getMessage";
import {IMessage} from "../../../services/types";

jest.mock("../../../services/sqlite-db", () => ({
    db: {
        getFromDB: jest.fn(),
        tableMessages: "messagesDB"
    },
}));

import {db} from "../../../services/sqlite-db";

describe("getMessagesRoute", () => {

    it("should get and return messages from DB", async () => {
        const req = mockRequest();
        const res = mockResponse();
        res.status.mockReturnValue(res);
        const message: IMessage[] = [
            {
                id: 1,
                username: "test-1",
                email: "test@gmail.com",
                message: "some text"
            },
            {
                id: 1,
                username: "test-2",
                email: "test@gmail.com",
                message: "some text 2"
            },
        ];
        (db.getFromDB as jest.Mock).mockResolvedValue(message);

        await getMessagesRoute(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(message);
        expect(db.getFromDB).toHaveBeenCalledWith("messagesDB");
    });
    it("should return 500 on error", async () => {
        const req = mockRequest();
        const res = mockResponse();

        res.status.mockReturnValue(res);
        res.json.mockReturnValue(res);

        (db.getFromDB as jest.Mock).mockRejectedValue(new Error("DB error"));
        await getMessagesRoute(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: "Failed to get messages"});
    })
});
