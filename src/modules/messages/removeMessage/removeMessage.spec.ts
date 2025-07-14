import {removeMessageRoute} from "./removeMessage";

jest.mock('../../../services/sqlite-db', () => ({
    db: {
        delIdFromDB: jest.fn(),
        tableMessages: "messagesDB"
    }
}))
import {db} from "../../../services/sqlite-db";
import {mockRequest, mockResponse} from "jest-mock-req-res";

describe("removeMessageRoute", () => {
    it("should should remove messages from DB", async () => {
        const req = mockRequest({
            params: {
                id: "99"
            }
        });
        const res = mockResponse()
        res.sendStatus.mockReturnValue(res);
        (db.delIdFromDB as jest.Mock).mockResolvedValue(undefined)
        await removeMessageRoute(req,res)

        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(db.delIdFromDB).toHaveBeenCalledWith("messagesDB","99")
    })
})


