const routes = [
  {
    path: "/",
    name: "mainTest",
    component: () => import("./components/main")
  },
  {
    path: "/random",
    name: "randomUser",
    component: () => import("./components/main_random")
  },
  {
    path: "/participant_ID/:participant_ID",
    name: "main",
    beforeEnter: (to, from, next) => {
      const id = to.query.participant_ID;
      localStorage.setItem('participant_ID',id);
      next()
    },
    component: () => import("./components/TabBar")
  },
  {
    path: "/k_approval_exp",
    name: "k_approval_exp",
    component: () => import("./components/input_formats/k_approval_exp")
  },
  {
    path: "/Threshold_exp",
    name: "Threshold_exp",
    component: () => import("./components/input_formats/Threshold_exp")
  },
  {
    path: "/Knapsack_exp",
    name: "Knapsack_exp",
    component: () => import("./components/input_formats/Knapsack_exp")
  },
  {
    path: "/Utilities_exp",
    name: "Utilities_exp",
    component: () => import("./components/input_formats/Utilities_exp")
  },
  {
    path: "/Ranking_value_exp",
    name: "Ranking_value_exp",
    component: () => import("./components/input_formats/Ranking_value_exp")
  },
  {
    path: "/Ranking_value_money_exp",
    name: "Ranking_value_money_exp",
    component: () => import("./components/input_formats/Ranking_value_money_exp")
  },
  {
    path: "/Consistency",
    name: "Consistency",
    component: () => import("./components/Consistency")
  },
  {
    path: "/Feedback_quiz",
    name: "Feedback_quiz",
    component: () => import("./components/Feedback_quiz"),
    props: true
  },
  // {
  //   path: "*",
  //   name: "notFound",
  //   component: NotFound
  // }

];

export default routes;
