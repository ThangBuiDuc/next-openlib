import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { createRoot } from "react-dom/client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { usePagination, useSearchBox } from "react-instantsearch";
import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";

export default function Autocomplete({ ...autocompleteProps }) {
  const autocompleteContainer = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query")
    ? decodeURI(searchParams.get("query"))
    : "";

  const { refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();

  const [instantSearchUiState, setInstantSearchUiState] = useState({ query });

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.push(
      pathName + "?" + createQueryString("query", instantSearchUiState.query)
    );
  }, [instantSearchUiState.query]);

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: "instantsearch",

      limit: 3,

      transformSource({ source, onRemove, onTapAhead }) {
        return {
          ...source,
          templates: {
            ...source.templates,
            item(param) {
              const { item } = param;

              return (
                <div class="aa-ItemWrapper">
                  <div class="aa-ItemContent">
                    <div class="aa-ItemIcon aa-ItemIcon--noBorder">
                      <img src="/recent.svg" width="20" height="20" />
                    </div>
                    <div class="aa-ItemContentBody">
                      <div class="aa-ItemContentTitle">{item.label}</div>
                    </div>
                  </div>
                  <div class="aa-ItemActions" className="flex gap-[10px]">
                    <button
                      class="aa-ItemActionButton"
                      className="hover:bg-bordercl"
                      title="Xoá khỏi danh sách tìm kiếm gần đây"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.id);
                      }}
                    >
                      <img src="/trash-can.svg" width="20" height="20" />
                    </button>
                    <button
                      class="aa-ItemActionButton"
                      className="hover:bg-bordercl"
                      title="Tìm kiếm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTapAhead(item);
                      }}
                    >
                      <img
                        src="/arrow-narrow-up-left.svg"
                        width="20"
                        height="20"
                      />
                    </button>
                  </div>
                </div>
              );
            },
          },

          onSelect({ item }) {
            setInstantSearchUiState({ query: item.label });
          },
        };
      },
    });

    return [recentSearches];
  }, []);

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return undefined;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      classNames: {
        form: "  !border-none !outline-none !rounded-[40px] md:!h-[55px] !h-[34px] !bg-[#b0ddeb80]",
        input: "!text-[15px] md:!text-[20px] ",
        panel: "md:z-[20]",
        submitButton: "[&>svg]:fill-black",
      },

      container: autocompleteContainer.current,
      initialState: { query },
      onReset() {
        setInstantSearchUiState({ query: "" });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query,
          });
        }
      },

      translations: {
        clearButtonTitle: "Xoá",
        submitButtonTitle: "Tìm kiếm",
        detachedCancelButtonText: "Huỷ",
      },
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      plugins,
    });

    return () => autocompleteInstance.destroy();
  }, [plugins]);

  return <div className="w-[85%]" ref={autocompleteContainer} />;
}
