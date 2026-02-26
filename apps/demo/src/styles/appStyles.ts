import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#111111',
  },
  button: {
    backgroundColor: '#2f6fe4',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  list: {
    gap: 8,
    paddingBottom: 24,
  },
  row: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#dddddd',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowImage: {
    width: 56,
    height: 78,
    borderRadius: 6,
    backgroundColor: '#eeeeee',
  },
  rowContent: {
    flex: 1,
    gap: 4,
  },
  rowName: {
    color: '#111111',
    fontWeight: '700',
    fontSize: 15,
  },
  rowId: {
    color: '#666666',
    fontSize: 12,
  },
  errorText: {
    color: '#c62828',
  },
  emptyText: {
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
  },
  controls: {
    gap: 10,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  detailsContent: {
    padding: 16,
    gap: 14,
  },
  detailsImage: {
    width: '100%',
    aspectRatio: 0.72,
    borderRadius: 12,
    backgroundColor: '#eeeeee',
  },
  detailsTitle: {
    color: '#111111',
    fontSize: 24,
    fontWeight: '700',
  },
  detailsMeta: {
    color: '#555555',
    fontSize: 14,
  },
  detailsSection: {
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  detailsSectionLabel: {
    color: '#222222',
    fontSize: 13,
    fontWeight: '700',
  },
  detailsSectionValue: {
    color: '#444444',
    fontSize: 14,
  },
});
