const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(category => res.json(category))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  Tag.findOne(
    {
      where: {
        id: req.params.id
      },
      include: [
        {    
          model: Product,        
          attributes: ['product_name']
        }
      ]
    },
  )
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: 'There are no tags matching that id'})
    }
    res.json(tag)
  })  
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: 'There are no tags matching that id'})
    }
    res.json(tag)
  })  
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

module.exports = router;
