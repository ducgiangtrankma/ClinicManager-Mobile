import { sizes } from '@src/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayContainer: {
    height: sizes._48sdp,
    width: sizes._48sdp,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: sizes._4sdp,
  },
  dayContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayNumberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    textAlign: 'center',
  },

  dotsContainer: {
    minHeight: sizes._8sdp,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: sizes._2sdp,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes._3sdp, // Giảm gap để fit 4 dots
    flexWrap: 'wrap',
    maxWidth: sizes._36sdp, // Giới hạn width
  },
  eventDot: {
    width: sizes._6sdp,
    height: sizes._6sdp,
    borderRadius: sizes._2sdp,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  todayText: {
    fontWeight: 'bold',
  },
  emojiImage: {
    width: sizes._24sdp,
    height: sizes._24sdp,
  },
  emptyEmoji: {
    width: sizes._22sdp,
    height: sizes._22sdp,
    borderRadius: sizes._16sdp,
  },
  todayDate: {
    backgroundColor: 'red',
    width: sizes._22sdp,
    height: sizes._22sdp,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
