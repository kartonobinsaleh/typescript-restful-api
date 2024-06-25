import { logger } from "./applications/logging";
import { web } from "./applications/web";

const PORT = process.env.PORT || 5000;

web.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
