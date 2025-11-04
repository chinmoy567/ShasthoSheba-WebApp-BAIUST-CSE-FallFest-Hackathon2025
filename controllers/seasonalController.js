// controllers/seasonalController.js

const getSeason = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 6 && month <= 9) return "Monsoon";
  if (month >= 10 && month <= 2) return "Winter";
  return "Summer";
};

const seasonalTips = {
  Monsoon: [
    {
      title: "Prevent Dengue and Malaria",
      tips: [
        "Use mosquito nets and repellents.",
        "Clear standing water around the house.",
        "Wear full-sleeve clothing.",
      ],
    },
    {
      title: "Food & Water Safety",
      tips: [
        "Boil water for 10 minutes before drinking.",
        "Avoid roadside cut fruits.",
        "Wash hands with soap before meals.",
      ],
    },
    {
      title: "Keep Homes Dry",
      tips: [
        "Fix leaky roofs and walls.",
        "Use dehumidifiers or keep windows open when possible.",
        "Avoid damp carpets or mats.",
      ],
    },
    {
      title: "Stay Healthy Outdoors",
      tips: [
        "Avoid wading through dirty rainwater.",
        "Wear waterproof footwear.",
        "Keep feet clean and dry after getting wet.",
      ],
    },
    {
      title: "Protect Electrical Devices",
      tips: [
        "Unplug devices during lightning storms.",
        "Avoid touching switches with wet hands.",
        "Use surge protectors where possible.",
      ],
    },
    {
      title: "Boost Immunity",
      tips: [
        "Include turmeric, ginger, and garlic in meals.",
        "Take vitamin C-rich foods.",
        "Sleep at least 7 hours daily.",
      ],
    },
    {
      title: "Avoid Fungal Infections",
      tips: [
        "Keep clothes and shoes dry.",
        "Use antifungal powder if needed.",
        "Avoid sharing towels or footwear.",
      ],
    },
    {
      title: "Travel Safety",
      tips: [
        "Carry raincoat or umbrella always.",
        "Check weather forecasts before travel.",
        "Avoid slippery or waterlogged roads.",
      ],
    },
    {
      title: "Pet Care",
      tips: [
        "Keep pets indoors during heavy rain.",
        "Dry them properly after walks.",
        "Ensure vaccination against tick-borne diseases.",
      ],
    },
    {
      title: "Home Hygiene",
      tips: [
        "Disinfect frequently touched surfaces.",
        "Keep garbage bins covered.",
        "Use natural air fresheners to prevent musty smell.",
      ],
    },
  ],

  Winter: [
    {
      title: "Prevent Cold, Flu & Pneumonia",
      tips: [
        "Keep children and elderly warm.",
        "Avoid cold water baths early morning.",
        "Seek medical help for prolonged cough or fever.",
      ],
    },
    {
      title: "Nutrition & Immunity",
      tips: [
        "Eat seasonal fruits like oranges and guavas.",
        "Drink warm fluids and soups.",
        "Take enough rest and sunlight.",
      ],
    },
    {
      title: "Skin Care",
      tips: [
        "Apply moisturizer regularly.",
        "Use mild soap for bathing.",
        "Stay hydrated even in cold weather.",
      ],
    },
    {
      title: "Respiratory Health",
      tips: [
        "Avoid smoky environments.",
        "Wear a mask if air quality is poor.",
        "Practice deep breathing exercises.",
      ],
    },
    {
      title: "Exercise Routine",
      tips: [
        "Do warm-up before workouts.",
        "Try indoor exercises if too cold outside.",
        "Stay consistent with daily movement.",
      ],
    },
    {
      title: "Heating Safety",
      tips: [
        "Avoid leaving heaters unattended.",
        "Ensure good ventilation when using gas heaters.",
        "Keep flammable materials away from heaters.",
      ],
    },
    {
      title: "Elderly Care",
      tips: [
        "Check room temperature regularly.",
        "Ensure proper clothing layers.",
        "Encourage regular fluid intake.",
      ],
    },
    {
      title: "Mental Well-being",
      tips: [
        "Spend time in sunlight to reduce winter blues.",
        "Connect with family and friends.",
        "Maintain hobbies or reading habits.",
      ],
    },
    {
      title: "Protect Plants",
      tips: [
        "Move delicate plants indoors.",
        "Avoid overwatering in cold weather.",
        "Cover outdoor plants during frost.",
      ],
    },
    {
      title: "Pet Health",
      tips: [
        "Provide warm bedding for pets.",
        "Limit outdoor time in extreme cold.",
        "Feed slightly more to maintain warmth.",
      ],
    },
  ],

  Summer: [
    {
      title: "Beat the Heat",
      tips: [
        "Drink ORS and plenty of clean water.",
        "Avoid going out during midday sun.",
        "Wear light cotton clothes.",
      ],
    },
    {
      title: "Prevent Diarrhea & Food Poisoning",
      tips: [
        "Eat freshly cooked food.",
        "Keep food covered and refrigerate leftovers.",
        "Wash hands before eating.",
      ],
    },
    {
      title: "Sun Protection",
      tips: [
        "Use sunscreen with SPF 30 or above.",
        "Wear sunglasses and hats outdoors.",
        "Avoid direct sunlight between 12–3 PM.",
      ],
    },
    {
      title: "Stay Hydrated",
      tips: [
        "Carry a water bottle wherever you go.",
        "Drink coconut water or lemon juice.",
        "Avoid excessive caffeine or alcohol.",
      ],
    },
    {
      title: "Prevent Heat Stroke",
      tips: [
        "Rest in cool, shaded places.",
        "Sprinkle water on face and neck if overheated.",
        "Seek medical help if dizzy or nauseous.",
      ],
    },
    {
      title: "Home Cooling",
      tips: [
        "Use curtains or blinds to block sunlight.",
        "Switch to LED lights to reduce heat.",
        "Keep a bowl of water indoors to add humidity.",
      ],
    },
    {
      title: "Food Storage",
      tips: [
        "Store perishables in the fridge promptly.",
        "Avoid keeping milk or meat outside for long.",
        "Use airtight containers for dry foods.",
      ],
    },
    {
      title: "Travel Comfort",
      tips: [
        "Carry water and sunblock on trips.",
        "Avoid leaving children or pets in parked cars.",
        "Plan travel early morning or evening.",
      ],
    },
    {
      title: "Power Outage Prep",
      tips: [
        "Keep backup power or fans ready.",
        "Charge essential devices in advance.",
        "Store ice packs to keep food cool.",
      ],
    },
    {
      title: "Pet Safety",
      tips: [
        "Provide plenty of clean drinking water.",
        "Keep pets indoors during extreme heat.",
        "Never walk pets on hot pavement.",
      ],
    },
  ],
};

// Render Seasonal Tips Page
exports.getSeasonalPage = (req, res) => {
  const season = getSeason();
  const tips = seasonalTips[season];

  res.render("seasonal/seasonalPage", {
    title: "Seasonal Health Tips",
    user: req.session.user,
    season,
    tips,
  });
};

// API endpoint (for AJAX if needed)
exports.getSeasonalJSON = (req, res) => {
  const season = getSeason();
  res.json({
    season,
    tips: seasonalTips[season],
  });
};
