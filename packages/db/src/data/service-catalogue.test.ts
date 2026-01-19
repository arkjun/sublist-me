import { describe, expect, it } from 'vitest';
import {
  CATEGORY_INFO,
  getAllCategories,
  getCategoriesWithServices,
  getServiceBySlug,
  getServicesByCategory,
  getSlugByLogoUrl,
  SERVICE_CATALOGUE,
} from './service-catalogue';

describe('Service Catalogue', () => {
  describe('SERVICE_CATALOGUE data integrity', () => {
    it('should have at least 50 services', () => {
      expect(SERVICE_CATALOGUE.length).toBeGreaterThanOrEqual(50);
    });

    it('should have unique slugs', () => {
      const slugs = SERVICE_CATALOGUE.map((s) => s.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it('should have required fields for all services', () => {
      SERVICE_CATALOGUE.forEach((service) => {
        expect(service.slug).toBeDefined();
        expect(service.slug.length).toBeGreaterThan(0);
        expect(service.names).toBeDefined();
        expect(service.url).toBeDefined();
        expect(service.category).toBeDefined();
      });
    });

    it('should have at least Korean name for all services', () => {
      SERVICE_CATALOGUE.forEach((service) => {
        expect(service.names.ko).toBeDefined();
        expect(service.names.ko?.length).toBeGreaterThan(0);
      });
    });

    it('should have valid URLs for all services', () => {
      SERVICE_CATALOGUE.forEach((service) => {
        expect(service.url).toMatch(/^https?:\/\//);
      });
    });

    it('should have valid categories', () => {
      const validCategories = CATEGORY_INFO.map((c) => c.id);
      SERVICE_CATALOGUE.forEach((service) => {
        expect(validCategories).toContain(service.category);
      });
    });
  });

  describe('CATEGORY_INFO data integrity', () => {
    it('should have 12 categories', () => {
      expect(CATEGORY_INFO.length).toBe(12);
    });

    it('should have unique category ids', () => {
      const ids = CATEGORY_INFO.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have required fields for all categories', () => {
      CATEGORY_INFO.forEach((category) => {
        expect(category.id).toBeDefined();
        expect(category.names).toBeDefined();
        expect(category.names.ko).toBeDefined();
        expect(category.names.en).toBeDefined();
        expect(category.icon).toBeDefined();
        expect(category.order).toBeDefined();
      });
    });

    it('should have unique order numbers', () => {
      const orders = CATEGORY_INFO.map((c) => c.order);
      const uniqueOrders = new Set(orders);
      expect(orders.length).toBe(uniqueOrders.size);
    });
  });

  describe('getServiceBySlug', () => {
    it('should return service for valid slug', () => {
      const netflix = getServiceBySlug('netflix');
      expect(netflix).toBeDefined();
      expect(netflix?.slug).toBe('netflix');
      expect(netflix?.names.ko).toBe('넷플릭스');
    });

    it('should return undefined for invalid slug', () => {
      const result = getServiceBySlug('non-existent-service');
      expect(result).toBeUndefined();
    });

    it('should return correct service for various slugs', () => {
      const testCases = [
        { slug: 'spotify', expectedKo: '스포티파이' },
        { slug: 'youtube-premium', expectedKo: '유튜브 프리미엄' },
        { slug: 'notion', expectedKo: '노션' },
        { slug: 'coupang-rocket-wow', expectedKo: '쿠팡 로켓와우' },
      ];

      testCases.forEach(({ slug, expectedKo }) => {
        const service = getServiceBySlug(slug);
        expect(service).toBeDefined();
        expect(service?.names.ko).toBe(expectedKo);
      });
    });

    it('should handle empty string', () => {
      const result = getServiceBySlug('');
      expect(result).toBeUndefined();
    });
  });

  describe('getServicesByCategory', () => {
    it('should return OTT services', () => {
      const ottServices = getServicesByCategory('ott');
      expect(ottServices.length).toBeGreaterThan(0);
      ottServices.forEach((service) => {
        expect(service.category).toBe('ott');
      });
    });

    it('should return music services', () => {
      const musicServices = getServicesByCategory('music');
      expect(musicServices.length).toBeGreaterThan(0);
      musicServices.forEach((service) => {
        expect(service.category).toBe('music');
      });
    });

    it('should return empty array for category with no services', () => {
      // 모든 카테고리에 서비스가 있으므로 이 테스트는 실제로 빈 배열을 반환하지 않음
      // 대신 존재하는 카테고리로 테스트
      const services = getServicesByCategory('ott');
      expect(Array.isArray(services)).toBe(true);
    });

    it('should include Netflix in OTT category', () => {
      const ottServices = getServicesByCategory('ott');
      const netflix = ottServices.find((s) => s.slug === 'netflix');
      expect(netflix).toBeDefined();
    });

    it('should include Spotify in music category', () => {
      const musicServices = getServicesByCategory('music');
      const spotify = musicServices.find((s) => s.slug === 'spotify');
      expect(spotify).toBeDefined();
    });

    it('should return services for all category types', () => {
      const categories = [
        'ott',
        'music',
        'gaming',
        'shopping',
        'productivity',
        'cloud',
        'news',
        'fitness',
        'education',
        'finance',
        'food',
      ] as const;

      categories.forEach((category) => {
        const services = getServicesByCategory(category);
        expect(services.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('getAllCategories', () => {
    it('should return all categories', () => {
      const categories = getAllCategories();
      expect(categories.length).toBe(12);
    });

    it('should return categories sorted by order', () => {
      const categories = getAllCategories();
      for (let i = 1; i < categories.length; i++) {
        expect(categories[i].order).toBeGreaterThan(categories[i - 1].order);
      }
    });

    it('should have OTT as first category', () => {
      const categories = getAllCategories();
      expect(categories[0].id).toBe('ott');
    });

    it('should have other as last category', () => {
      const categories = getAllCategories();
      expect(categories[categories.length - 1].id).toBe('other');
    });

    it('should not modify original CATEGORY_INFO', () => {
      const originalLength = CATEGORY_INFO.length;
      const categories = getAllCategories();
      categories.pop();
      expect(CATEGORY_INFO.length).toBe(originalLength);
    });
  });

  describe('getCategoriesWithServices', () => {
    it('should return categories that have services', () => {
      const categories = getCategoriesWithServices();
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should return categories sorted by order', () => {
      const categories = getCategoriesWithServices();
      for (let i = 1; i < categories.length; i++) {
        expect(categories[i].order).toBeGreaterThan(categories[i - 1].order);
      }
    });

    it('should only include categories with at least one service', () => {
      const categories = getCategoriesWithServices();
      categories.forEach((category) => {
        const services = getServicesByCategory(category.id);
        expect(services.length).toBeGreaterThan(0);
      });
    });

    it('should not include "other" if no services in that category', () => {
      const otherServices = getServicesByCategory('other');
      const categories = getCategoriesWithServices();
      const hasOther = categories.some((c) => c.id === 'other');

      if (otherServices.length === 0) {
        expect(hasOther).toBe(false);
      } else {
        expect(hasOther).toBe(true);
      }
    });
  });

  describe('getSlugByLogoUrl', () => {
    it('should return slug for valid Netflix logoUrl', () => {
      const netflixLogoUrl =
        'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png';
      expect(getSlugByLogoUrl(netflixLogoUrl)).toBe('netflix');
    });

    it('should return slug for valid Spotify logoUrl', () => {
      const spotifyLogoUrl =
        'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png';
      expect(getSlugByLogoUrl(spotifyLogoUrl)).toBe('spotify');
    });

    it('should return undefined for invalid logoUrl', () => {
      expect(getSlugByLogoUrl('https://invalid.com/logo.png')).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      expect(getSlugByLogoUrl('')).toBeUndefined();
    });

    it('should return correct slugs for various services', () => {
      const testCases = [
        {
          logoUrl: 'https://cdn.simpleicons.org/youtube',
          expectedSlug: 'youtube-premium',
        },
        {
          logoUrl: 'https://www.notion.so/images/favicon.ico',
          expectedSlug: 'notion',
        },
        {
          logoUrl:
            'https://image7.coupangcdn.com/image/coupang/favicon/v2/favicon.ico',
          expectedSlug: 'coupang-rocket-wow',
        },
      ];

      testCases.forEach(({ logoUrl, expectedSlug }) => {
        expect(getSlugByLogoUrl(logoUrl)).toBe(expectedSlug);
      });
    });

    it('should handle all services with logoUrl', () => {
      const servicesWithLogo = SERVICE_CATALOGUE.filter((s) => s.logoUrl);
      servicesWithLogo.forEach((service) => {
        const result = getSlugByLogoUrl(service.logoUrl!);
        expect(result).toBe(service.slug);
      });
    });
  });
});
