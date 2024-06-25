"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input, InputGroup, InputLeftElement } from "./ChakraUI";
import { SearchIcon } from "./Icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebouncedCallback = (func: (...args: any) => void, wait: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeout = useRef<any>();

  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any) => {
      const later = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        clearTimeout(timeout?.current);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        func(...args);
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      clearTimeout(timeout?.current);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      timeout.current = setTimeout(later, wait);
    },
    [func, wait]
  );
};

export default function SearchQuery() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = useDebouncedCallback(() => {
    // Hit the API
    const response = searchQuery;

    if (response) {
      router?.push(`/reports/?search=${response}`);
    } else {
      router?.push(`/reports`);
    }
  }, 500);

  useEffect(() => {
    onSearch();
  }, [searchQuery, onSearch]);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        {/* <SearchIcon /> */}
        <Image
          src="images/search_icon.svg"
          width={16}
          height={16}
          alt="Search Icon"
        />
      </InputLeftElement>
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        paddingLeft={35}
        type="text"
        borderRadius={"20px"}
        bg={"var(--app-input-bg)"}
        placeholder="Search"
      />
    </InputGroup>
  );
}
