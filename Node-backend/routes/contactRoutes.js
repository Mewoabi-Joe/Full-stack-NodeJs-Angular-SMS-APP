const { Router } = require("express");
const contactController = require("../controllers/contactController");

const router = Router();

router.get("/:id", contactController.contacts_get);
router.put("/:id", contactController.contacts_put);
router.delete("/delete/:arrayId", contactController.contacts_delete);
router.put("/update/:arrayId", contactController.contacts_update);
// router.get("/logout", authController.logout_get);

module.exports = router;
