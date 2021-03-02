import { Router, Request, Response } from "express";
import {
  userDetailValidator,
} from "../validators/user.validator";
import UserController from "../controllers/user.controller";
import { validateToken } from "../../../common-modules/utilities/jwt-token";

const userRoute = (router: Router) => {
  router.post(
    "/users/signup",
    (req: Request, res: Response) => {
      UserController.signUp(req.body).then((response) => {
        return res.status(response.status).send(response);
      });
    }
  );

  router.post(
    "/users/login",
    (req: Request, res: Response) => {
      UserController.login(req.body.mobileNumber).then(
        (response) => {
          return res.status(response.status).send(response);
        }
      );
    }
  );

  router.get(
    "/users/profile",
    validateToken,
    (req: any, res: Response) => {
      UserController.getUserDetail(req.user.id).then((response) => {
        return res.status(response.status).send(response);
      });
    }
  );

  router.put(
    "/users/profile",
    validateToken,
    (req: any, res: Response) => {
      UserController.updateUser(
        req.user,
        req.body.name
      ).then((response) => {
        return res.status(response.status).send(response);
      });
    }
  );
};

export { userRoute };
