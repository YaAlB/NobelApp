import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import colors from '../styles/colors';
import constants from '../styles/constants';
import fonts from '../styles/fonts';
import icons from '../images/icons';
import ActionBase from '../component/ActionBase';

import {
  levenshteinDistance,
  qualityResults,
  capitalizeFirstLetter,
} from '../utils/nobelUtil/index';

const API_URL = 'https://api.nobelprize.org/v1/prize.json';

interface Props {}

export type Prize = {
  id: string;
  year: string;
  category: string;
  laureates: Laureate[];
};

export type Laureate = {
  id: string;
  firstname: string;
  surname: string;
  motivation: string;
};

interface State {
  prizes: Prize[];
  filteredPrizes: Prize[];
  searchQuery: string;
}

class NobelPrizes extends Component<Props, State> {
  private intervalId?: ReturnType<typeof setTimeout>;
  constructor(props: Props) {
    super(props);

    this.state = {
      prizes: [],
      filteredPrizes: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    // Start polling instantly and then poll every 120 seconds
    this.fetchData();
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 1200000);
  }

  componentWillUnmount() {
    // Stop polling the server when the component is unmounted
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async fetchData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({
        prizes: data.prizes,
        filteredPrizes: data.prizes, // initialize filteredPrizes with all prizes
      });
    } catch (error) {
      console.error('Error fetching prizes:', error);
    }
  }

  handleSearchTextChange = (searchQuery: string) => {
    this.setState({searchQuery}, this.filterPrizes);
  };

  filterPrizes = () => {
    const {prizes, searchQuery} = this.state;

    const searchWords = searchQuery.trim().toLowerCase().split(/\s+/);

    const isYearValueOnly =
      searchWords && searchWords.length === 1 && !isNaN(+searchWords[0]);

    const filteredPrizesWithlevenshteinDistance = prizes.filter(prize => {
      // compare each search word with prize properties using levenshtein distance
      const yearDistance = levenshteinDistance(
        prize.year.toString(),
        searchQuery,
      );
      const categoryDistance = levenshteinDistance(
        prize.category.toLowerCase(),
        searchQuery.toLowerCase(),
      );

      // calculate an average distance for all search words
      const avgDistance = isYearValueOnly
        ? yearDistance / searchWords.length
        : searchWords.length === 1
        ? categoryDistance / searchWords.length
        : (yearDistance + categoryDistance) / searchWords.length;
      return (
        avgDistance <= (isYearValueOnly ? 0 : searchWords.length === 1 ? 1 : 8)
      ); // show prizes with average distance <= 3
    });
    const sortedResults = qualityResults(
      filteredPrizesWithlevenshteinDistance,
      searchWords,
    );

    this.setState({filteredPrizes: sortedResults});
  };

  render() {
    const {searchQuery, filteredPrizes} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TextInput
            style={styles.textInputStyle}
            value={searchQuery}
            onChangeText={this.handleSearchTextChange}
            autoCorrect={true}
            placeholder={'i.e. "chemistry 1911" or "peace"'}
          />
          <FlatList
            data={filteredPrizes}
            initialNumToRender={10}
            contentContainerStyle={styles.scrollContent}
            maxToRenderPerBatch={20}
            renderItem={({item, index}) => (
              <View key={`${item.id}-${index}`} style={styles.items}>
                <ActionBase
                  icon={
                    item.category === 'chemistry'
                      ? icons.Chemistry
                      : item.category === 'physics'
                      ? icons.Physics
                      : item.category === 'economics'
                      ? icons.Economics
                      : item.category === 'medicine'
                      ? icons.Medicine
                      : item.category === 'peace'
                      ? icons.Peace
                      : item.category === 'literature'
                      ? icons.Literature
                      : icons.Loupe
                  }
                  title={`The Nobel Prize in ${capitalizeFirstLetter(
                    item.category,
                  )} ${item.year}`}
                  text={item?.laureates?.map(
                    (laureate, laureateIndex) =>
                      laureate.firstname && (
                        <Text key={`${laureate.id}-${laureateIndex}`}>
                          {laureate.firstname} {laureate.surname}
                          {', '}
                        </Text>
                      ),
                  )}
                />
              </View>
            )}
            keyExtractor={(_: Prize, index: number) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default NobelPrizes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  textInputStyle: {
    margin: constants.space.small,
    minHeight: constants.height.base,
    flexDirection: 'row',
    paddingHorizontal: constants.space.small,
    paddingVertical: 0,
    backgroundColor: colors.white,
    textAlign: 'left',
    borderStyle: 'solid',
    borderRadius: 6,
    borderColor: colors.neutralDarkest,
    fontSize: fonts.size.large,
    color: colors.ultraBlack,
    position: 'relative',
    borderWidth: 1,
  },
  items: {
    marginTop: -15,
  },
});
