import {mockRequest, mockResponse} from 'jest-mock-req-res';
import {getMessagesRoute} from "./getMessage";
import {IMessage} from "../../../services/types";
import {db} from "../../../services/sqlite-db";

jest.mock('../../../services/sqlite-db', () => ({
    db: {
        getFromBD: jest.fn(),
    },
}));

describe('getMessagesRoute', () => {

    it('should should get and return messages from DB', async () => {
        const req = mockRequest();
        const res = mockResponse();
        res.status.mockReturnValue(res);
        const message: IMessage[] = [
            {
                id: 1,
                username: 'test-1',
                email: "test@gmail.com",
                message: "some text"
            },
            {
                id: 1,
                username: 'test-2',
                email: "test@gmail.com",
                message: "some text 2"
            },
        ];
        (db.getFromBD as jest.Mock).mockResolvedValue(message);

        await getMessagesRoute(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(message);
    });
});
