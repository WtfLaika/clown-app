import { useQueryClient } from '@tanstack/react-query'

/**
 * This hook contains a reference to the singleton instance of QueryClient for any place you user it.
 * We need instantiate it only once, due to a big amount of dependencies
 */
const useClient = () => useQueryClient()

export default useClient
