import toast from 'react-hot-toast';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { firestore, query, collection, onSnapshot, orderBy, where } from 'Firebase';
import { toCapitalize } from 'utils/helper-funcs';
import { createTag as createNewTag } from 'services/firebaseApi';

const TagContext = createContext();

const TagProvider = ({ children, user }) => {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    let unsub;
    const fetchTags = async () => {
      try {
        const queryRef = query(
          collection(firestore, 'tags'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        unsub = onSnapshot(queryRef, (snapshot) => {
          const docs = [];
          snapshot.docs.forEach((doc) => {
            const data = { ...doc.data() };
            docs.push({
              id: doc.id,
              label: data.tagName,
              value: data.tagName.toLowerCase(),
              ...data,
            });
          });

          setTags([...docs]);
        });
      } catch (error) {
        toast.error("Oops!! Couldn't get tags");
      }
    };

    if (user?.uid) {
      fetchTags();
    }

    return () => {
      if (typeof unsub === 'function') {
        unsub();
      }
    };
  }, [user?.uid]);

  const createTag = useCallback(
    async (tagName) => {
      const res = await createNewTag({
        userId: user?.uid,
        tagName: toCapitalize(tagName),
        value: tagName.toLowerCase(),
      });
      if (res?.id) {
        return true;
      }

      return false;
    },
    [user?.uid]
  );

  const ctxValue = useMemo(() => ({ tags, createTag }), [tags, createTag]);

  return <TagContext.Provider value={ctxValue}>{children}</TagContext.Provider>;
};

export const useTagContext = () => useContext(TagContext);

export default TagProvider;
