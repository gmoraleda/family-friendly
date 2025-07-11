import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Tables } from '../../database.types'

// Mock the entire Supabase module before importing our service
const mockFrom = vi.fn()
const mockSupabaseClient = {
  from: mockFrom,
}

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}))

// Import after mocking
const { addPlace, getPlaces, getPlaceById } = await import('./database_service')

describe('Database Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('addPlace', () => {
    it('should successfully add a place', async () => {
      const mockPlace: Tables<'places'> = {
        id: 1,
        name: 'Test Place',
        description: 'A test place',
        category: 'restaurant',
        latitude: 40.7128,
        longitude: -74.0060,
        created_at: '2023-01-01T00:00:00Z',
      }

      const mockResult = {
        data: [mockPlace],
        error: null,
      }

      const mockSelect = vi.fn().mockResolvedValue(mockResult)
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect })
      mockFrom.mockReturnValue({ insert: mockInsert })

      const result = await addPlace(mockPlace)

      expect(mockFrom).toHaveBeenCalledWith('places')
      expect(mockInsert).toHaveBeenCalledWith([mockPlace])
      expect(mockSelect).toHaveBeenCalled()
      expect(result).toEqual([mockPlace])
    })

    it('should throw an error when adding a place fails', async () => {
      const mockPlace: Tables<'places'> = {
        id: 1,
        name: 'Test Place',
        description: 'A test place',
        category: 'restaurant',
        latitude: 40.7128,
        longitude: -74.0060,
        created_at: '2023-01-01T00:00:00Z',
      }

      const mockError = new Error('Database error')
      const mockResult = {
        data: null,
        error: mockError,
      }

      const mockSelect = vi.fn().mockResolvedValue(mockResult)
      const mockInsert = vi.fn().mockReturnValue({ select: mockSelect })
      mockFrom.mockReturnValue({ insert: mockInsert })

      await expect(addPlace(mockPlace)).rejects.toThrow('Database error')
      expect(mockFrom).toHaveBeenCalledWith('places')
      expect(mockInsert).toHaveBeenCalledWith([mockPlace])
    })
  })

  describe('getPlaces', () => {
    it('should successfully retrieve all places', async () => {
      const mockPlaces: Tables<'places'>[] = [
        {
          id: 1,
          name: 'Place 1',
          description: 'First place',
          category: 'restaurant',
          latitude: 40.7128,
          longitude: -74.0060,
          created_at: '2023-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'Place 2',
          description: 'Second place',
          category: 'park',
          latitude: 40.7589,
          longitude: -73.9851,
          created_at: '2023-01-02T00:00:00Z',
        },
      ]

      const mockResult = {
        data: mockPlaces,
        error: null,
      }

      const mockSelect = vi.fn().mockResolvedValue(mockResult)
      mockFrom.mockReturnValue({ select: mockSelect })

      const result = await getPlaces()

      expect(mockFrom).toHaveBeenCalledWith('places')
      expect(mockSelect).toHaveBeenCalled()
      expect(result).toEqual(mockPlaces)
    })

    it('should return an empty array when no places are found', async () => {
      const mockResult = {
        data: null,
        error: null,
      }

      const mockSelect = vi.fn().mockResolvedValue(mockResult)
      mockFrom.mockReturnValue({ select: mockSelect })

      const result = await getPlaces()

      expect(result).toEqual([])
    })

    it('should throw an error when fetching places fails', async () => {
      const mockError = new Error('Database connection error')
      const mockResult = {
        data: null,
        error: mockError,
      }

      const mockSelect = vi.fn().mockResolvedValue(mockResult)
      mockFrom.mockReturnValue({ select: mockSelect })

      await expect(getPlaces()).rejects.toThrow('Database connection error')
      expect(mockFrom).toHaveBeenCalledWith('places')
    })
  })

  describe('getPlaceById', () => {
    it('should successfully retrieve a place by ID', async () => {
      const mockPlace: Tables<'places'> = {
        id: 1,
        name: 'Test Place',
        description: 'A test place',
        category: 'restaurant',
        latitude: 40.7128,
        longitude: -74.0060,
        created_at: '2023-01-01T00:00:00Z',
      }

      const mockResult = {
        data: mockPlace,
        error: null,
      }

      const mockSingle = vi.fn().mockResolvedValue(mockResult)
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle })
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq })
      mockFrom.mockReturnValue({ select: mockSelect })

      const result = await getPlaceById('1')

      expect(mockFrom).toHaveBeenCalledWith('places')
      expect(mockSelect).toHaveBeenCalled()
      expect(mockEq).toHaveBeenCalledWith('id', '1')
      expect(mockSingle).toHaveBeenCalled()
      expect(result).toEqual(mockPlace)
    })

    it('should throw an error when place is not found', async () => {
      const mockError = new Error('Place not found')
      const mockResult = {
        data: null,
        error: mockError,
      }

      const mockSingle = vi.fn().mockResolvedValue(mockResult)
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle })
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq })
      mockFrom.mockReturnValue({ select: mockSelect })

      await expect(getPlaceById('999')).rejects.toThrow('Place not found')
      expect(mockFrom).toHaveBeenCalledWith('places')
      expect(mockEq).toHaveBeenCalledWith('id', '999')
    })

    it('should handle database errors when fetching place by ID', async () => {
      const mockError = new Error('Database timeout')
      const mockResult = {
        data: null,
        error: mockError,
      }

      const mockSingle = vi.fn().mockResolvedValue(mockResult)
      const mockEq = vi.fn().mockReturnValue({ single: mockSingle })
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq })
      mockFrom.mockReturnValue({ select: mockSelect })

      await expect(getPlaceById('1')).rejects.toThrow('Database timeout')
    })
  })
})
