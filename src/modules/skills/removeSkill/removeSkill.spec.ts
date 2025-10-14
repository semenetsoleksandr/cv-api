import {mockRequest, mockResponse} from "jest-mock-req-res";

jest.mock("../../../services/sqlite-db", () => ({
    db: {
        delIdFromDB: jest.fn(),
        tableSkills: "skillsDB"
    }
}));
import {db} from "../../../services/sqlite-db";
import {removeSkillRoute} from "./removeSkill";
import {removeMessageRoute} from "../../messages/removeMessage/removeMessage";

describe("removeSkillRoute", () => {
    it("should remove skill  from DB", async () => {
        const req = mockRequest({
            params: {
                id: 101
            }
        });
        const res = mockResponse();
        res.sendStatus.mockReturnValue(res);
        (db.delIdFromDB as jest.Mock).mockResolvedValue(undefined);
        await removeSkillRoute(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(db.delIdFromDB).toHaveBeenCalledWith("skillsDB", 101);
    });
    it("should return 500 on error", async () => {
        const req = mockRequest();
        const res = mockResponse()
        res.status.mockReturnValue(res);
        res.json.mockReturnValue(res);

        (db.delIdFromDB as jest.Mock).mockRejectedValue(new Error("DB error"))
        await removeSkillRoute(req,res)

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: "Failed to remove skill"})

    })
})
