import {mockRequest, mockResponse} from "jest-mock-req-res";
import {createMessageRoute} from "./createMessage"
import {IMessage} from "../../../services/types";

jest.mock('../../../services/sqlite-db', () => ({
    db: {
        addDataToBD: jest.fn(),
        tableMessages: "messagesDB"
    }
}))
import { db } from "../../../services/sqlite-db";

describe("createMessagesRoute", () => {
    it("should should add message to DB", async () => {
        const mockMessage: IMessage = {
            id: 99,
            username: "bob",
            email: "bobt@gmail.com",
            message: "some text"
        };
        const req = mockRequest({
            body: {
                username: "bob",
                email: "bob@gmail.com",
                message: "some text"
            }
        });
        const res = mockResponse()
        res.status.mockReturnValue(res);
        res.json.mockReturnValue(res);

        (db.addDataToBD as jest.Mock).mockResolvedValue(mockMessage);
        await createMessageRoute(req, res);

        expect(res.status).toHaveBeenCalledWith(201)
        expect(db.addDataToBD).toHaveBeenCalledWith(
            "messagesDB",
            ["username", "email","message"],
            ["bob","bob@gmail.com", "some text"]
        )
        expect(res.json).toHaveBeenCalledWith(mockMessage)
        expect(mockMessage.username).toBe(req.body.username)
    })
})
