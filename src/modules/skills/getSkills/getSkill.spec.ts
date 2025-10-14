import {mockRequest, mockResponse} from "jest-mock-req-res";

jest.mock("../../../services/sqlite-db", () => ({
    db: {
        getFromDB: jest.fn(),
        tableSkills: "skillsDB"
    },
}));

import {db} from "../../../services/sqlite-db";
import {ISkill} from "../../../services/types";
import {getSkillRoute} from "./getSkills";

describe("getSkillsRoute", () => {
    it( "should should get and return skills from DB", async () => {
        const req = mockRequest();
        const res = mockResponse();
        res.status.mockReturnValue(res)
        const skills: ISkill[] = [
            {
                id: 99,
                skill: "testSkill"
            },
            {
                id: 101,
                skill: "testSkill2"
            },
        ];
        (db.getFromDB as jest.Mock).mockResolvedValue(skills);

        await getSkillRoute(req, res);

        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(skills);
        expect(db.getFromDB).toHaveBeenCalledWith("skillsDB");
    });
    it("should return 500 on error", async () => {
        const req = mockRequest();
        const res = mockResponse();

        res.status.mockReturnValue(res);
        res.json.mockReturnValue(res);

        (db.getFromDB as jest.Mock).mockRejectedValue(new Error("DB error"));
        await getSkillRoute(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: "Failed to get skills"});
    })
})
