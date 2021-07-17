import { useComplains } from "../../redux/hooks/complain.hooks";

export const useFeedbackLogic = () => {
  const complains = useComplains()

  return { complains }
}