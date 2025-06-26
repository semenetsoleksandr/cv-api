import { mockResponse } from 'jest-mock-req-res';

import { getMessagesRoute } from './getMessage';
import { ISkill } from '../../../services/types';
import { db } from '../../../services/sqlite-db';

jest.mock('../../../services/sqlite-db', () => ({
    db: {
        getMessagessFromBD: jest.fn(),
    },
}));

describe('getMessagesRoute', () => {

    it('should should get and return messages from DB ', async () => {
        const req = mockResponse();
        const res = mockResponse();
        res.status.mockReturnValue(res);
        const skills: ISkill[] = [
            {
                id: 1,
                skill: 'test-1',
            },
            {
                id: 2,
                skill: 'test-2',
            },
        ];
        (db.getMessagessFromBD as jest.Mock).mockResolvedValue(skills);

        await getMessagesRoute(req as any, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(skills);
    });
});
