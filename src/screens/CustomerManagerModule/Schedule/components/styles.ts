import { sizes } from '@src/utils';
import { StyleSheet } from 'react-native';

export const entryItemStyles = StyleSheet.create({
  entryContainer: {
    flexDirection: 'row',
    marginBottom: sizes._12sdp,
  },
  timelineContainer: {
    width: sizes._60sdp,
    alignItems: 'center',
    marginRight: sizes._8sdp,
  },
  entryTime: {
    marginBottom: sizes._4sdp,
  },

  timelineContent: {
    flex: 1,
    alignItems: 'center',
  },
  timelineDot: {
    width: sizes._8sdp,
    height: sizes._8sdp,
    borderRadius: sizes._4sdp,
    marginVertical: sizes._4sdp,
  },
  timelineLine: {
    width: sizes._1sdp,
    flex: 1,
  },
  entryContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: sizes._12sdp,
    padding: sizes._12sdp,
    marginBottom: sizes._8sdp,
  },
  emojiContainer: {
    marginRight: sizes._8sdp,
  },
  moodEmoji: {
    width: sizes._32sdp,
    height: sizes._32sdp,
  },
  entryTextContent: {
    flex: 1,
  },
  entryTitle: {
    marginBottom: sizes._4sdp,
  },
  entryDescription: {
    lineHeight: sizes._20sdp,
  },
  photoContainer: {
    marginTop: sizes._4sdp,
  },
  photoScrollView: {
    flexDirection: 'row',
    marginBottom: sizes._4sdp,
  },
  photoScrollContent: {
    alignItems: 'center',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  photo: {
    width: '100%',
    height: sizes._160sdp,
    borderRadius: sizes._8sdp,
    marginBottom: sizes._4sdp,
  },
  photoHorizontal: {
    width: sizes._140sdp,
    height: sizes._120sdp,
    borderRadius: sizes._8sdp,
  },
  photoHalf: {
    width: '49%',
    marginRight: '2%',
    height: sizes._120sdp,
  },
  videoContainer: {
    width: sizes._140sdp,
    height: sizes._120sdp,
    borderRadius: sizes._8sdp,
    overflow: 'hidden',
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: sizes._40sdp,
    height: sizes._40sdp,
    borderRadius: sizes._20sdp,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleVideoContainer: {
    width: '100%',
    height: sizes._160sdp,
    borderRadius: sizes._8sdp,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: sizes._4sdp,
  },
  singleVideo: {
    width: '100%',
    height: '100%',
  },
  singleVideoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
