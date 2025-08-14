import {mockRequest, mockResponse} from "jest-mock-req-res";

jest.mock("../../../services/sqlite-db", () => ({
    db: {
        patchSkill: jest.fn()
    }
}));

import {db} from "../../../services/sqlite-db";
import {patchSkillRoute} from "./patchSkill";
import {removeMessageRoute} from "../../messages/removeMessage/removeMessage";

describe("patchSkillRoute", () => {
    it("should patch skill in DB", async () => {
        const req = mockRequest({
            params: {
                id: 99
            },
            body: {
                skill: "testPatchSkill"
            }
        });
        const res = mockResponse();
        res.sendStatus.mockReturnValue(res);
        (db.patchSkill as jest.Mock).mockResolvedValue(undefined);
        await patchSkillRoute(req,res);
        expect(res.sendStatus).toHaveBeenCalledWith(200);
        expect(db.patchSkill).toHaveBeenCalledWith(99, "testPatchSkill")
    });
    it("should return 500 on error", async () => {
        const req = mockRequest();
        const res = mockResponse()
        res.status.mockReturnValue(res);
        res.json.mockReturnValue(res);

        (db.patchSkill as jest.Mock).mockRejectedValue(new Error("DB error"))
        await patchSkillRoute(req,res)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: "Failed to patch skill"})

    })
})
