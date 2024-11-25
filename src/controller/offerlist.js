import offerlistModel from "../model/offerlist.js";
import offerModel from "../model/offer.js";
import accommodationModel from "../model/accommodation.js";

const GET_ALL_OFFERLIST = async (req, res) => {
  const offerList = await offerlistModel
    .find({ isDeleted: false, isAvailable: true })
    .populate({
      path: "offer",
      model: offerModel,
      populate: { path: "accommodation", model: accommodationModel },
    });

  return res.status(200).json(offerList);
};

export { GET_ALL_OFFERLIST };
