import {
  AVATAR_MAX_IMAGE_HEIGHT,
  AVATAR_MAX_IMAGE_WIDTH
} from "back-end/config";
import * as crud from "back-end/lib/crud";
import { Connection } from "back-end/lib/db";
import * as permissions from "back-end/lib/permissions";
import FileResource, {
  CreateRequestBody,
  ValidatedCreateRequestBody
} from "back-end/lib/resources/file";
import {
  SupportedRequestBodies,
  SupportedResponseBodies
} from "back-end/lib/types";
import jimp from "jimp";
import { CreateValidationErrors } from "shared/lib/resources/file";
import { Session } from "shared/lib/resources/session";
import {
  getInvalidValue,
  invalid,
  isValid,
  valid
} from "shared/lib/validation";
import * as fileValidation from "shared/lib/validation/file";

type Resource = crud.Resource<
  SupportedRequestBodies,
  SupportedResponseBodies,
  CreateRequestBody,
  ValidatedCreateRequestBody,
  CreateValidationErrors,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  Session,
  Connection
>;

export async function compressFile(path: string) {
  let image = await jimp.read(path);
  if (
    image.bitmap.width >= image.bitmap.height &&
    image.bitmap.width > AVATAR_MAX_IMAGE_WIDTH
  ) {
    image = image.resize(AVATAR_MAX_IMAGE_WIDTH, jimp.AUTO);
  } else if (image.bitmap.height > AVATAR_MAX_IMAGE_HEIGHT) {
    image = image.resize(jimp.AUTO, AVATAR_MAX_IMAGE_HEIGHT);
  }

  image.write(path);
}

const resource: Resource = {
  routeNamespace: "avatars",

  create(connection) {
    const fileCreateObj = FileResource.create!(connection);
    return {
      ...fileCreateObj,
      async validateRequestBody(request) {
        // Perform regular file validation
        const validatedRequestBody = await fileCreateObj.validateRequestBody(
          request
        );
        // Then perform avatar-specific validation
        if (isValid(validatedRequestBody)) {
          const { name } = validatedRequestBody.value;
          const validatedFileName = fileValidation.validateAvatarFilename(name);
          if (isValid(validatedFileName)) {
            if (!request.session) {
              return invalid({
                permissions: [permissions.ERROR_MESSAGE]
              });
            }
            // Compress avatar image files to max width/height
            await compressFile(validatedRequestBody.value.path);
            return valid({
              ...validatedRequestBody.value,
              name: validatedFileName.value
            });
          } else {
            return invalid({
              name: getInvalidValue(validatedFileName, undefined)
            });
          }
        }
        return validatedRequestBody;
      }
    };
  }
};

export default resource;
