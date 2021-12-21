const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll();
    // be sure to include its associated Products??
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // JOIN with products, using the productTag through table
      // be sure to include its associated Products
      include: [{ model: Product, through: ProductTag, as: 'category_products' }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    };

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
