import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

const verifyRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const rolesArray = [...allowedRoles];

    const payload: any = jsonwebtoken.verify(
      req.headers.authorization?.replace("Bearer ", "") ?? ``,
      process.env.JWT_SECRET ?? ``,
    );

    const result = rolesArray.find((role: string) => role === payload.role);
    if (!result)
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    next();
  };
};

export default verifyRoles;
