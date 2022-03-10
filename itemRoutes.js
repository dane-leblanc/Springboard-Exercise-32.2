const express = require("express");
const router = new express.Router();

const items = require("./fakeDb");

/** GET /items: render a list of shopping items */

router.get("/", (req, res) => {
  return res.json(items);
});

router.post("/", (req, res) => {
  const newItem = {
    name: req.body.name,
    price: req.body.price,
  };
  items.push(newItem);
  return res.json({ added: newItem });
});

router.get("/:name", (req, res) => {
  const itemName = req.params.name;
  for (let item of items) {
    if (itemName === item.name) {
      return res.json(item);
    }
  }
  return res.json({ error: `${itemName} is not on your list.` });
});

router.patch("/:name", (req, res) => {
  const itemName = req.params.name;
  const patchedItem = {
    name: req.body.name,
    price: req.body.price,
  };
  for (let i = 0; i <= items.length; i++) {
    if (itemName === items[i].name) {
      items.splice(i, 1);
      items.push(patchedItem);
      return res.json({ updated: patchedItem });
    }
  }
  return res.json({ error: `${itemName} is not on your list.` });
});

router.delete("/:name", (req, res) => {
  const itemName = req.params.name;
  for (let i = 0; i <= items.length; i++) {
    if (itemName === items[i].name) {
      items.splice(i, 1);
      return res.json({ message: "Deleted" });
    }
  }
  return res.json({ error: `${itemName} is not on your list.` });
});

module.exports = router;
