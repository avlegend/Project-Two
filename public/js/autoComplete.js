
var options = {
  data: ["Fried chicken","Friend chicken", "Almond", "Asparagus", "Avocado crab boats", "Avocado salad", "Avocado toast", "Avocado tuna salad", "Apple pie", "Apple sauce", "Apple strudel", "Bacon cheddar deviled eggs", " Banana Bread", "Bean dip", "BBQ ribs", "BBQ", "Belgian waffles", "Biscuits", "BLT", "Black bean tacos", "Borscht", "Bread", "Brisket", "Broccoli", "Brownie", "Buffalo wings", "Bundt cake", "Burrito", "Cake", "Candied Yams", "Carne Asada", "Carrot cake", "Carrot soup", "Casserole", "Ceasar salad", "Cheese pizza", "Cheesecake", "Chili", "Chocolate cake", "Chocolate chip cookies", "Cheeseburger","Chicken", "Chicken pot pie", "Chicken sandwich", "Chicken soup","Cinnamon rolls", "Clam chowder", "Cobb Salad ", "Cornbread", "Corn chowder", "Corn on the cob", "Cottage cheese", "Cream cheese", "Crab Cake", "Dairy-free chocolate", "Dairy free", "Deviled Eggs", "Dessert", "Donut", "Dumplings and gravy", "Enchilada", "Egg roll","Eggnog", "Eggplant", "English muffin", "Fajitas", "Falafel", "Filet mignon", "Fish fillet", "Gluten free", "Grits",
    "Fondu", "Fruit", "Juice", "French toast", "French fries", "Granola", "Ice cream", "Italian meatballs", "Hamburger", "Ham", "Hummus", "Jam", "Jelly", "Grilled cheese Sandwich", "Gravy", "Guacamole", "Kale", "Ketchup ", "Key lime", "Jambalaya", "Jell-o",
    "Lamb", "Lamb chops", "Lemon", "Lime pie", "Liver", "Lasagna", "Lobster", "Mac and Cheese", "Macarons", "Margarita", "Mashed potatoes", "Meatloaf", "Muffins", "Mustard",
    "Nachos", "Oatmeal cookies", "Omellete", "Onion rings", "Orange", "Pancake", "Parmesan roasted broccoli", "Pasta", "Pea soup", "Peanut butter and jelly", "Pecan pie", "Pepperoni pizza", "Pho", "Pie", "Pizza", "Potatoes", "Popsicles", "Pork chops", "Pot Pie", "Pot stickers", "Potatoe skins", "Pound cake", "Pumpkin pie", "Quino","Raisin bread", "Ramen", "Red velvet cake", "Ribs", "Rice vermicelli", "Raspberry", "Rice pilaf", "Roast beef", "Rum cake", "Salad", "Sandwich", "Smoked sausage", "Scrambeled Eggs", "Shami kebab", "Shrimp", "Sloppy joes", "Smoked salom", "Smoothie", "Spinach and kale smoothie", "Squash", "Spaghetti", "Sponge cake", "Spring Roll", "Soup", "Strawberry pie", "Stir fry", "Swedish meatballs", "Sweet Potato", "Sushi", "Strawberry", "Strawberry cake", "Tacos", "Tarter sauce", "Tater Tots", "Thai salad", "Thai noodles‎", "Tikka", "tofu", "Tomato soup", "Tomato chutney", "Tortilla", "Turkey", "Turkey and stuffing casserole", "Turkey chowder", "Unsweetened chocolate", "Upside-down cake", "Vietnamese noodles‎", "Vietnamese Sandwich", "Walnut", "Waffle", "Wheat tortilla", "Vegan cookies", "Vegan", "Vegetarian", "Yams", "Yogurt", "Zucchini", "zucchini bread", "Zuppa pavese"],
  list: {
    onClickEvent: function () {
      $("#search").submit()
    },
    match: {
      enabled: true
    }
  }
};

function hi() {
  console.log('hello')
}

$("#searchRecipe").easyAutocomplete(options);


