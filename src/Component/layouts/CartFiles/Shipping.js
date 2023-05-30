import React, { useState } from "react";
import "./shipping.css";
// import Loader from "../LoadingFiles/Loader";
import MetaData from "../MetaData";
import { Country, State } from "country-state-city";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { useDispatch, useSelector } from "react-redux";
import CheckOutStepProces from "./CheckOutStepProces";
import { ToastError } from "../../Alert-POP's/Alertpop";
import { saveShippingDetails } from "../../../Actions/CartAction";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();

  const { shippingDetails } = useSelector((state) => state.cart);

  const [addressDetail, setaddressDetail] = useState(
    shippingDetails.addressDetail
  );
  const [cityDetail, setcityDetail] = useState(shippingDetails.cityDetail);
  const [pincodeDetail, setpincodeDetail] = useState(
    shippingDetails.pincodeDetail
  );
  const [phoneDetail, setphoneDetail] = useState(shippingDetails.phoneDetail);
  const [stateDetail, setstateDetail] = useState(shippingDetails.stateDetail);
  const [countryDetail, setcountryDetail] = useState(
    shippingDetails.countryDetail
  );

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneDetail <= 10) {
      ToastError("Enter the valid Phone number");
      return;
    }
    disptach(
      saveShippingDetails({
        address: addressDetail,
        city: cityDetail,
        pincode: pincodeDetail,
        phoneNo: phoneDetail,
        state: stateDetail,
        country: countryDetail,
      })
    );
    navigate("/order/confirm");
  };
  return (
    <>
      <MetaData title="Shipping Details" />

      <CheckOutStepProces processStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={addressDetail}
                onChange={(e) => setaddressDetail(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={cityDetail}
                onChange={(e) => setcityDetail(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="phone"
                placeholder="Pin Code"
                required
                value={pincodeDetail}
                onChange={(e) => setpincodeDetail(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="phone"
                placeholder="Phone Number"
                required
                value={phoneDetail}
                onChange={(e) => setphoneDetail(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={countryDetail}
                onChange={(e) => setcountryDetail(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {countryDetail && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={stateDetail}
                  onChange={(e) => setstateDetail(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(countryDetail).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={stateDetail ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
