import { Html } from "survey-vue";

const projectsNum=localStorage.getItem('num_of_projects');
export const data={
        Utilities:{
            q1:{
                q:"What is the main goal of this task?",
                ans1:"To learn about the city budget.",
                ans2:"To distribute 100 projects among 10 points according to how important you think each point is",
                ans3:"To distribute 100 points among the presented projects according to how important you think each project is",
                ans4:"To have fun"
            },
            q2:{
                q:"What does the NORMALIZE button do?",
                ans1:"Finish the task",
                ans2:"Automatically adjust your values to add up to 100 while keeping the ratio",
                ans3:"Randomly splits the 100 points",
                ans4:"Nothing"
            },
            q3:{
                q:"What's wrong with the image below?",
                ans1:"Current total not equal to Target.\n      NORMALIZE button will fix it",
                ans2:"Some items are assigned 0 points",
                ans3:"Target is larger than the current total",
                ans4:"Nothing is wrong, I can click on the CONTINUE \n      button and finish the task"
            },
            q4:{
                q:"Suppose Alex's ratings for the items are as shown below, which statement is true?",
                ans1:"'Security Cameras' > 'Laundry Access in Public Schools' > '24H public toilet'",
                ans2:"'Computers for the community learning center' > 'Security Cameras'",
                ans3:"'Laundry Access in Public Schools' > 'Security Cameras'",
                ans4:"'24H public toilet' > 'Security Cameras' > 'Laundry Access in Public Schools'"
            }
        },
        Knapsack:{
            q1:{
                q:"What is the main goal of this task?",
                ans1:"To learn about the city budget.",
                ans2:"To select exactly 3 projects out of a list of projects.",
                ans3:"To select my preferred projects from a list of the presented projects given a budget limit.",
                ans4:"To have fun"
            },
            q2:{
                q:"You get a 30 cent bonus ...",
                ans1:"For passing this quiz",
                ans2:"For correctly answering a consistency test after submitting the task",
                ans3:"For doing the task",
                ans4:"For nothing"
            },
            q3:{
                q:"What's wrong with clicking SUBMIT in the image below?",
                ans1:"Nothing is wrong",
                ans2:"Some items are unselected",
                ans3:"Current total is lower than the limit",
                ans4:"None of the items are selected"
            },
            q4:{
                q:"What's wrong with clicking SUBMIT in the image below?",
                ans1:"Nothing is wrong",
                ans2:"Some items are unselected",
                ans3:"Total is lower than the limit",
                ans4:"None of the items are selected"
            }
        },
        k_approval:{
            q1:{
                q:"What is the main goal of this task?",
                ans1:"To learn about the city budget.",
                ans2:"To select up to 20 projects from a list of 5 projects",
                ans3:"To select up to 5 projects from a list of the presented projects",
                ans4:"To have fun"
            },
            q2:{
                q:"You get a 30 cent bonus ...",
                ans1:"For passing the quiz",
                ans2:"For correctly answering a survey after submitting the task",
                ans3:"For doing the task",
                ans4:"For nothing"
            },
            q3:{
                q:"What's wrong with clicking SUBMIT in the image below?",
                ans1:"Nothing is wrong",
                ans2:"Some items are unselected",
                ans3:"Current total is lower than the limit",
                ans4:"None of the items are selected"
            },
            q4:{
                q:"What's wrong with clicking SUBMIT in the image below?",
                ans1:"Nothing is wrong",
                ans2:"Some items are unselected",
                ans3:"Total number of items is lower than the limit",
                ans4:"None of the items are selected"
            }
        },
        Ranking_value:{
            q1:{
                q:"Please select the correct answer:",
                ans1:"Projects at the TOP of the list are LESS important than projects on the BOTTOM of the list.",
                ans2:"Projects at the BOTTOM of the list are MORE important than projects on the TOP of the list.",
                ans3:"Projects at the TOP of the list are MORE important than projects on the BOTTOM of the list.",
                ans4:"There are no differences"
            },
            q2:{
                q:"You get a 30 cent bonus ...",
                ans1:"For passing the quiz",
                ans2:"For correctly answering a survey after submitting the task",
                ans3:"For doing the task",
                ans4:"For nothing"
            },
            q3:{
                q:"In the ranking below, which item is the most important?",
                ans1:"Computers for the community learning center",
                ans2:"Dog park",
                ans3:"Security Cameras",
                ans4:"24H public toilet"
            },
            q4:{
                q:"In the ranking below, which item is MORE important than \n 'Sheltered Bike Parking at the Main Library'?",
                ans1:"Dog Park",
                ans2:"Security Cameras",
                ans3:"24H public toilet",
                ans4:"Laundry Access in Public Schools"
            }
        },
        Threshold:{
            q1:{
                q:"What is the main goal of this task?",
                ans1:"To learn about the city budget.",
                ans2:"To select the projects that I think should receive at least 100 points, given that 10 points are to be distributed among the projects based on their importance.",
                ans3:"To select the projects that I think should receive at least 10 points, given that 100 points are to be distributed among the projects based on their importance.",
                ans4:"To have fun"
            },
            q2:{
                q:"You get a 30 cent bonus ...",
                ans1:"For passing the quiz",
                ans2:"For correctly answering a survey after submitting the task",
                ans3:"For doing the task",
                ans4:"For nothing"
            },
            q3:{
                q:"What's wrong with clicking SUBMIT in the image below?",
                ans1:"Nothing is wrong",
                ans2:"Some items are unselected",
                ans3:"Current total is lower than the limit",
                ans4:"None of the items are selected"
            },
            q4:{
                q:"What's wrong with clicking SUBMIT in the image below?",
                ans1:"Nothing is wrong",
                ans2:"Some items are unselected",
                ans3:"Total number of items is lower than the limit",
                ans4:"None of the items are selected"
            }
        },
        Ranking_value_money:{
            q1:{
                q:"Please select the correct answer:",
                ans1:'Projects at the TOP of the list are LOWER in "value for money" than projects on the BOTTOM of the list',
                ans2:'Projects at the BOTTOM of the list are HIGHER in "value for money" than projects on the TOP of the list',
                ans3:'Projects at the TOP of the list are HIGHER in "value for money" than projects on the BOTTOM of the list',
                ans4:'There are no differences'
            },
            q2:{
                q:"Suppose the cost of a 'Dog Park' is equal to 250 and that your utility from it is 25. \n Please select the correct answer:",
                ans1:"The value for money a 'Dog Park' is equal to 250",
                ans2:"The value for money a 'Dog Park' is equal to 0.1",
                ans3:"The value for money a 'Dog Park' is equal to 25",
                ans4:"The value for money a 'Dog Park' is equal to 10"
            },
            q3:{
                q:"In the image below, suppose your utility for '24H public toilet' is 400,000 \n and for 'Laundry Access in Public Schools' is 200,000",
                ans1:"I will rank 'Laundry Access in Public Schools' higher than '24H public toilet'",
                ans2:"I will rank '24H public toilet' higher than 'Laundry Access in Public Schools'",
                ans3:'There are no differences between the "value for money" of each item',
                ans4:"I don't know the utilities of Alex"
            },
            q4:{
                q:"In the image below, suppose your utility for '24H public toilet' is 320,000, \n for 'Dog Park' is 200,000 and for 'The Sustainable Energy Pilot' is 100,000. \nWhat will be your ranking(from highest to lowest 'value for money')?",
                ans1:"'The Sustainable Energy Pilot' > 'Dog Park' > '24H public toilet'",
                ans2:"'24H public toilet' > 'The Sustainable Energy Pilot' > 'Dog Park'",
                ans3:"'Dog Park' > '24H public toilet' > 'The Sustainable Energy Pilot'",
                ans4:"'The Sustainable Energy Pilot' > '24H public toilet' > 'Dog Park'"
            }
        },

    }