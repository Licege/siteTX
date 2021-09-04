import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllStaffPositions } from "../getters/staffPositions.getters";
import { fetchAllPositions } from "../thunks/staffPositions.thunk";

export const useStaffPositions = ({ force = false } = {}) => {
  const dispatch = useDispatch()
  const positions = useSelector(getAllStaffPositions);

  useEffect(() => {
    if (!positions.length || force) {
      dispatch(fetchAllPositions())
    }
  }, [])

  return positions;
}