const { Router } = require("express");
const messageController = require("../controllers/messageController");

const router = Router();

router.get("/:id", messageController.messages_get);
router.put("/:id", messageController.messages_put);
router.post("/send_message", messageController.messages_send);
// router.delete("/delete/:arrayId", messageController.contacts_delete);
// router.put("/update/:arrayId", messageController.contact_update);
// // router.get("/logout", authController.logout_get);

module.exports = router;
