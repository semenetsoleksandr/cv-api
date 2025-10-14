import {mockRequest, mockResponse} from "jest-mock-req-res";
import {createSkillRoute} from "./createSkill";

jest.mock("../../../services/sqlite-db", () => ({
    db: {
        addDataToBD: jest.fn(),
        tableSkills: "skillsDB"
    }
}));
import {db} from "../../../services/sqlite-db";
import {ISkill} from "../../../services/types";


describe("createSkillRoute", () => {
    it("should add skill to DB", async () => {
        const mockSkill: ISkill = {
            id: 100,
            skill: "testSkill"
        };
        const req = mockRequest({
            body: {skill: "testSkill"}
        });
        const res = mockResponse();

        res.status.mockReturnValue(res);
        res.json.mockReturnValue(res);

        (db.addDataToBD as jest.Mock).mockResolvedValue(mockSkill);
        await createSkillRoute(req, res);
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockSkill)
        expect(db.addDataToBD).toHaveBeenCalledWith(
            "skillsDB", ["skill"], ["testSkill"]
        )
    })
    it("should return 500 on error", async () => {
        const req = mockRequest();
        const res = mockResponse();

        res.status.mockReturnValue(res);
        res.json.mockReturnValue(res);

        (db.addDataToBD as jest.Mock).mockRejectedValue(new Error("DB error"))
        await createSkillRoute(req, res)
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({error: "Failed to create skill"})
    }
    )
})
