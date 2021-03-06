class TrieNode {
  constructor(public key: string, 
    public children: Map<string, TrieNode> = new Map<string, TrieNode>()) { }
}

class Trie {
  private root: TrieNode = new TrieNode('Root');
  constructor(...items: string[]) {
    for (const item of items) {
      this.push(item);
    }
  }

  public push(text: string): void {
    let children: Map<string, TrieNode> = this.root.children;

    for (const character of text) {
      let node: TrieNode | null = null;
      if (children.get(character)) {
        node = children.get(character)!;
      } else {
        node = new TrieNode(character);
        children.set(character, node);
      }
      children = node!.children;
    }
  }

  public find(text: string): TrieNode | null {
    let node: TrieNode | null = null;
    let currentNode: Map<string, TrieNode> = this.root.children;

    for (let character of text) {
      if (currentNode.get(character)) {
        node = currentNode.get(character)!;
        currentNode = node!.children;
      }
      else {
        return null;
      }
    }
    return node;
  }
}

const trie = new Trie("hello", "help", "item", "helter-skelter");
console.log(trie.find("he")!.children);