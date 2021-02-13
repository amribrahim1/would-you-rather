import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ListQuestions from './ListQuestions';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center'
    },
}));

export default function Home(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let answeredQuestionsIds = [];
    let answeredQuestions = [];
    let unansweredQuestions = [];
    if (props.authedUser) {
        for(var i in props.users[props.authedUser].answers) {
            answeredQuestionsIds.push(i)
            props.questions[i].authorAvatar = props.users[props.questions[i].author].avatarURL
            props.questions[i].authorName = props.users[props.questions[i].author].name
            answeredQuestions.push(props.questions[i])
        }
        for(var x in props.questions) {
            const aid = answeredQuestionsIds.find(id=> id===x)
            if (!aid) {
                props.questions[x].authorAvatar = props.users[props.questions[x].author].avatarURL
                props.questions[x].authorName = props.users[props.questions[x].author].name
                unansweredQuestions.push(props.questions[x])
            }
        }
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Unanswered Questions" {...a11yProps(1)} />
                    <Tab label="Answered Questions" {...a11yProps(0)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={1}>
                <ListQuestions questions={answeredQuestions}/>
            </TabPanel>
            <TabPanel value={value} index={0}>
                <ListQuestions questions={unansweredQuestions}/>
            </TabPanel>
        </div>
    );
}
