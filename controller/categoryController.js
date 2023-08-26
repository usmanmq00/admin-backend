const Category = require("../models/categoryModels");

// get all Categorys
const getCategorys = async (req, res) => {
  const allCategories = await Category.find({});

  // Helper function to find the index of a category by ID
  const findCategoryIndexById = (categoryId) =>
    allCategories.findIndex(
      (category) => category._id.toString() === categoryId.toString()
    );

  // Helper function to get the sorted categories based on parentCategory
  const getSortedCategories = (categories) => {
    const sortedCategories = [];

    // Start with categories that have no parentCategory
    const rootCategories = categories.filter(
      (category) => !category.parentCategory
    );
    for (const rootCategory of rootCategories) {
      sortedCategories.push(rootCategory);
      const processChildren = (parentCategoryTitle) => {
        const childCategories = categories.filter(
          (category) => category.parentCategory === parentCategoryTitle
        );
        for (const childCategory of childCategories) {
          sortedCategories.push(childCategory);
          processChildren(childCategory.title);
        }
      };
      processChildren(rootCategory.title);
    }

    return sortedCategories;
  };

  const sortedCategories = getSortedCategories(allCategories);

  res.status(200).json(sortedCategories);
};

// create a new category
const createCategory = async (req, res) => {
  const { title, slug, parentCategory, description } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  // if (!slug) {
  //   emptyFields.push("slug");
  // }
  // if (!parentCategory) {
  //   emptyFields.push("parentCategory");
  // }
  // if (!description) {
  //   emptyFields.push("description");
  // }

  if (emptyFields.length > 0) {
    return res.send(`Please fill in all fields. ${emptyFields} is empty`);
  }

  // add to the database
  try {
    const category = await Category.create({
      title,
      slug,
      parentCategory,
      description,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCategorys,
  createCategory,
};
